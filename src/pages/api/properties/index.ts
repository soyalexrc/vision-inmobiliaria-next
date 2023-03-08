import {NextApiRequest, NextApiResponse} from "next";
import {db} from '@/../database';
import {queriesProperty as queries} from '@/../database/queries';
import {Property, SqlResponse} from "../../../../interfaces";

type DataProperties =
  | { message: string; }
  | Property[]
  | Property
  | SqlResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<DataProperties>) {

  switch (req.method) {
    case 'POST':
      return getProperties(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const getProperties = async (req: NextApiRequest, res: NextApiResponse) => {
  function getValueByAttribute(recordset: any, id: any) {
    const index = recordset.map((x: any) => x.property_attribute_id).indexOf(id);

    if (index === -1) {
      return null;
    }

    return recordset[index].value;
  }

  function getCustomQuery(req: NextApiRequest, option: any = null) {
    let result = option === null ? 'select p.* from property p ' : 'select count(*) from property p ';

    if (req.body.filters.length > 0) {
      let resultFilters = 'where ';

      let locationFlag = false;
      let attributeFlag = false;

      req.body.filters.forEach((filter: any) => {
        if (resultFilters !== 'where ') {
          resultFilters += " AND ";
        }

        if (filter.parameter === 'property_type') {
          resultFilters += "p.property_type = '" + filter.name + "'";
        }
        if (filter.parameter === 'operation_type') {
          resultFilters += "p.operation_type = '" + filter.name + "'";
        }
        if (filter.parameter === 'code') {
          if (filter.value !== null) {
            resultFilters += "p.user_id = '" + filter.value + "'";
          } else {
            resultFilters += "p.user_id IS NULL";
          }
        }
        if (filter.parameter === 'propertyCode') {
          if (filter.value !== null) {
            resultFilters += "p.code like '%" + filter.value + "%'";
          }
        }
        if (filter.parameter === 'price') {
          if (filter.name === 'Hasta 20.000') {
            resultFilters += "CAST(p.price as DECIMAL(9,2)) >= 0 and CAST(p.price as DECIMAL(9,2)) <= 20000";
          }
          if (filter.name === '20.000 a 40.000') {
            resultFilters += "CAST(p.price as DECIMAL(9,2)) >= 20000 and CAST(p.price as DECIMAL(9,2)) <= 40000";
          }
          if (filter.name === 'Más de 40.000') {
            resultFilters += "CAST(p.price as DECIMAL(9,2)) >= 40000";
          }
          if (filter.name.includes('Otro')) {
            let values = filter.name;
            values = values.replace('Otro ', '');
            console.log(parseFloat(values.split(' - ')));
            resultFilters += "CAST(p.price as DECIMAL(9,2)) >= " + values.split(' - ')[0] + " and CAST(p.price as DECIMAL(9,2)) <= " + values.split(' - ')[1];
          }
        }
        if (filter.parameter === 'state') {
          if (!locationFlag) {
            locationFlag = true;
            result += ' left join property_location pl on p.id = pl.property_id ';
          }
          resultFilters += "pl.state = '" + filter.name + "'";
        }
        if (filter.parameter === 'city') {
          if (!locationFlag) {
            locationFlag = true;
            result += ' left join property_location pl on p.id = pl.property_id ';
          }
          resultFilters += "pl.city = '" + filter.name + "'";
        }
        if (filter.parameter === 'municipality') {
          if (!locationFlag) {
            locationFlag = true;
            result += ' left join property_location pl on p.id = pl.property_id ';
          }
          resultFilters += "pl.municipality = '" + filter.name + "'";
        }
        if (filter.parameter === 'urbanization') {
          if (!locationFlag) {
            locationFlag = true;
            result += ' left join property_location pl on p.id = pl.property_id ';
          }
          resultFilters += "pl.urbanization = '" + filter.name + "'";
        }
        if (filter.parameter === 'attribute') {
          if (!attributeFlag) {
            attributeFlag = true;
            result += ' left join property_atribute_values pav on p.id = pav.property_id ';
            result += ' left join property_attribute pa on pav.property_attribute_id = pa.id ';
          }
          resultFilters += "pa.label = '" + filter.name + "' AND ";
          if (!isNaN(parseFloat(filter.value))) {
            resultFilters += "TRY_CAST(pav.value as DECIMAL(9,2)) >= " + filter.value;
          } else {
            resultFilters += "pav.value = '" + filter.value + "'";
          }
        }
      });

      result += resultFilters;
    }

    if (option === null) {
      result += ' ORDER BY p.created_date DESC' +
        '    OFFSET ' + ((req.body.pageNumber - 1) * req.body.pageSize) + ' ROWS' +
        '    FETCH NEXT ' + req.body.pageSize + ' ROWS ONLY'
    }

    console.log(result);
    return result;
  }

  try {
    const pool = await db.poolPromise;
    const resultProperty = await pool.request()
      .query(getCustomQuery(req));


    const resultPropertyCount = await pool.request()
      .query(getCustomQuery(req, 'count'));

    let result: any[] = [];

    // @ts-ignore
    async function getImage(id: any) {
      console.log('here')
      const resultImage = await pool.request()
        .input('property_id', db.sql.Int, id)
        .query(queries.getImageByPropertyId);

      if (resultImage.recordset.length > 0) {
        console.log(resultImage.recordset[0].image);
        return resultImage.recordset[0].image;
        // const filename = resultImage.recordset[0].image;
        // const filePath = path.join(appRoot, '/public/images/' + filename);
        // let result = await fs.readFileSync(filePath);
        // return (filename.endsWith(".pdf") ? 'data:application/pdf;base64,' : 'data:image/png;base64,') + result.toString('base64');
      } else {
        return null;
      }
    }

    const forLoop = async () => {
      for (let i = 0; i < resultProperty.recordset.length; i++) {
        const resultAttributesValues = await pool.request()
          .input('property_id', db.sql.Int, resultProperty.recordset[i].id)
          .query(queries.getAttributesByPropertyId);

        const resultAttributes = await pool.request()
          .input('property_type', db.sql.VarChar, resultProperty.recordset[i].property_type)
          .query(queries.getPropertyByPropertyType);

        let attributes: any[] = [];

        resultAttributes.recordset.forEach((attribute: any) => {
          attributes.push({
            "id": attribute.id,
            "property_type": attribute.property_type,
            "form_type": attribute.form_type,
            "label": attribute.label,
            "category": attribute.category,
            "placeholder": attribute.placeholder,
            "values": attribute.property_values,
            "value": getValueByAttribute(resultAttributesValues.recordset, attribute.id)
          })
        });

        const resultLocation = await pool.request()
          .input('property_id', db.sql.Int, resultProperty.recordset[i].id)
          .query(queries.getLocationByPropertyId);

        let location = {
          "country": resultLocation.recordset[0].country,
          "state": resultLocation.recordset[0].state,
          "municipality": resultLocation.recordset[0].municipality,
          "urbanization": resultLocation.recordset[0].urbanization,
          "avenue": resultLocation.recordset[0].avenue,
          "street": resultLocation.recordset[0].street,
          "buildingShoppingcenter": resultLocation.recordset[0].building_shoppingcenter,
          "buildingNumber": resultLocation.recordset[0].building_number,
          "floor": resultLocation.recordset[0].floor,
          "referencePoint": resultLocation.recordset[0].reference_point,
          "hotToGet": resultLocation.recordset[0].hot_to_get,
          "trunkNumber": resultLocation.recordset[0].trunk_number,
          "parkingNumber": resultLocation.recordset[0].parking_number,
          "trunkLevel": resultLocation.recordset[0].trunk_level,
          "parkingLevel": resultLocation.recordset[0].parking_level,
          "city": resultLocation.recordset[0].city,
        };

        result.push({
          id: resultProperty.recordset[i].id,
          company: resultProperty.recordset[i].company,
          userId: resultProperty.recordset[i].user_id,
          code: resultProperty.recordset[i].code,
          operationType: resultProperty.recordset[i].operation_type,
          propertyType: resultProperty.recordset[i].property_type,
          propertyCondition: resultProperty.recordset[i].property_condition,
          footageGround: resultProperty.recordset[i].footage_ground,
          footageBuilding: resultProperty.recordset[i].footage_building,
          description: resultProperty.recordset[i].description,
          price: resultProperty.recordset[i].price,
          property_status: resultProperty.recordset[i].property_status,
          created_date: resultProperty.recordset[i].created_date,
          image: await getImage(resultProperty.recordset[i].id),
          attributes: attributes,
          location: location
        })
      }
    };

    await forLoop();

    res.status(200).json({
      data: result,
      total: resultPropertyCount.recordset[0]['']
    })
  } catch (error: any) {
    res.status(500);
    res.status(500).json(JSON.stringify(error.message))
  }
}

