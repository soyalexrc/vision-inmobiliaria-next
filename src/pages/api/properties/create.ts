import {NextApiRequest, NextApiResponse} from "next";
import {Property, SqlResponse} from "../../../../interfaces";
import {db} from '@/../database';
import {queriesProperty as queries} from '@/../database/queries'


type DataProperties =
  | { message: string; }
  | Property[]
  | Property
  | SqlResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<DataProperties>) {
  switch (req.method) {
    case 'POST':
      return createProperty(req, res);

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}


const createProperty = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log(req.body);
  try {

    const pool = await db.poolPromise;
    const result = await pool.request()
      .input('company', db.sql.VarChar, req.body.property.company)
      .input('user_id', db.sql.Int, parseInt(req.body.property.userId))
      .input('code', db.sql.VarChar, req.body.property.code)
      .input('operation_type', db.sql.VarChar, req.body.property.operationType)
      .input('property_type', db.sql.VarChar, req.body.property.propertyType)
      .input('property_condition', db.sql.VarChar, req.body.property.propertyCondition)
      // .input('vip', db.sql.Bit, req.body.property.vip)
      .input('footage_ground', db.sql.VarChar, req.body.property.footageGround)
      .input('footage_building', db.sql.VarChar, req.body.property.footageBuilding)
      .input('description', db.sql.VarChar, req.body.property.description)
      .input('price', db.sql.VarChar, req.body.property.price)
      .input('property_status', db.sql.VarChar, req.body.property.property_status)
      .input('seller_id', db.sql.Int, parseInt(req.body.property.sellerId))
      .query(queries.add);

    // retrieve ID
    const propertyId = result.recordset[0].ID;

    if (req.body.attributes) {
      const forLoop = async () => {
        for (let index = 0; index < req.body.attributes.length; index++) {
          if (req.body.attributes[index].value !== null && req.body.attributes[index].value !== '') {
            await pool.request()
              .input('property_id', db.sql.Int, propertyId)
              .input('property_attribute_id', db.sql.Int, req.body.attributes[index].id)
              .input('value', db.sql.VarChar, req.body.attributes[index].value)
              .query(queries.addAttribute);
          }
        }
      };
      await forLoop();
    }

    if (req.body.images) {
      const forLoop = async () => {
        for (let index = 0; index < req.body.images.length; index++) {
          if (req.body.images[index].value !== null && req.body.images[index].value !== '') {
            await pool.request()
              .input('property_id', db.sql.Int, propertyId)
              .input('image', db.sql.VarChar, req.body.images[index].id)
              .query(queries.addImage);
          }
        }
      };
      await forLoop();
    }

    if (req.body.location) {
      await pool.request()
        .input('property_id', db.sql.Int, propertyId)
        .input('country', db.sql.VarChar, req.body.location.country)
        .input('state', db.sql.VarChar, req.body.location.state)
        .input('municipality', db.sql.VarChar, req.body.location.municipality)
        .input('urbanization', db.sql.VarChar, req.body.location.urbanization)
        .input('avenue', db.sql.VarChar, req.body.location.avenue)
        .input('street', db.sql.VarChar, req.body.location.street)
        .input('building_shoppingcenter', db.sql.VarChar, req.body.location.buildingShoppingcenter)
        .input('building_number', db.sql.VarChar, req.body.location.buildingNumber)
        .input('floor', db.sql.VarChar, req.body.location.floor)
        .input('reference_point', db.sql.VarChar, req.body.location.referencePoint)
        .input('hot_to_get', db.sql.VarChar, req.body.location.hotToGet)
        .input('trunk_number', db.sql.VarChar, req.body.location.trunkNumber)
        .input('parking_number', db.sql.VarChar, req.body.location.parkingNumber)
        .input('trunk_level', db.sql.VarChar, req.body.location.trunkLevel)
        .input('parking_level', db.sql.VarChar, req.body.location.parkingLevel)
        .input('city', db.sql.VarChar, req.body.location.city)
        .query(queries.addLocation);
    }

    if (req.body.clientData) {
      await pool.request()
        .input('property_id', db.sql.Int, propertyId)
        .input('property_origin', db.sql.VarChar, req.body.clientData.propertyOrigin)
        .input('document_condition', db.sql.VarChar, req.body.clientData.documentCondition)
        .input('cadastral_file', db.sql.VarChar, req.body.clientData.cadastralFile)
        .input('main_living_place', db.sql.VarChar, req.body.clientData.mainLivingPlace)
        .input('power', db.sql.VarChar, req.body.clientData.power)
        .input('power_condition', db.sql.VarChar, req.body.clientData.powerCondition)
        .input('mortgage', db.sql.VarChar, req.body.clientData.mortgage)
        .input('part_of_payment', db.sql.VarChar, req.body.clientData.partOfPayment)
        .input('commission', db.sql.VarChar, req.body.clientData.commission)
        .input('commission_seller', db.sql.VarChar, req.body.clientData.commissionSeller)
        .input('observations', db.sql.VarChar, req.body.clientData.observations)
        .input('commision_persentage', db.sql.VarChar, req.body.clientData.commision_persentage)
        .input('first_name', db.sql.VarChar, req.body.clientData.firstName)
        .input('last_name', db.sql.VarChar, req.body.clientData.lastName)
        .input('phone', db.sql.VarChar, req.body.clientData.cellPhone)
        .input('email', db.sql.VarChar, req.body.clientData.email)
        .input('birthday', db.sql.VarChar, req.body.clientData.birthday)
        .input('contact_first_name', db.sql.VarChar, req.body.clientData.contactFirstName)
        .input('contact_last_name', db.sql.VarChar, req.body.clientData.contactLastName)
        .input('contact_phone', db.sql.VarChar, req.body.clientData.contactCellPhone)
        .input('contact_email', db.sql.VarChar, req.body.clientData.contactEmail)
        .input('attorney_first_name', db.sql.VarChar, req.body.clientData.attorneyFirstName)
        .input('attorney_last_name', db.sql.VarChar, req.body.clientData.attorneyLastName)
        .input('attorney_phone', db.sql.VarChar, req.body.clientData.attorneyCellPhone)
        .input('attorney_email', db.sql.VarChar, req.body.clientData.attorneyEmail)
        .query(queries.addClientData);
    }

    if (req.body.files) {
      const forLoop = async () => {
        for (let index = 0; index < req.body.files.length; index++) {
          if (req.body.files[index].id !== null && req.body.files[index].id !== '') {
            await pool.request()
              .input('property_id', db.sql.Int, propertyId)
              .input('fileName', db.sql.VarChar, req.body.files[index].id)
              .input('name', db.sql.VarChar, req.body.files[index].name)
              .query(queries.addFile);
          }
        }
      };
      await forLoop();
    }

    res.status(201).json(result);

  } catch (error: any) {
    console.log(error);
    res.status(500).json({message: JSON.stringify(error.message)})
  }
}
