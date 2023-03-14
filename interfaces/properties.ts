export interface Property {
  id?: string | null;
  attributes: PropertyAttribute[];
  clientData: PropertyClientData;
  files: PropertyFile[];
  location: PropertyLocation;
  property: PropertyGeneralData;
  publicationSoruce: PublicationSourceData;
  images: PropertyImage[];
}

export interface PropertyAttribute {
  category: string;
  form_type: string;
  id: number
  label: string;
  placeholder: string;
  property_type: string;
  property_values: string | null;
  values: string | null;
  value: string;
}

interface PropertyClientData {
  finalPrice: string | null;
  price: string;
  minimunNegotiation: string | null;
  attorneyCellPhone: string;
  attorneyEmail: string;
  attorneyFirstName: string;
  attorneyLastName: string;
  birthday: string;
  cadastralFile: string;
  cellPhone: string;
  commission_persentage: string;
  commission: string;
  commissionSeller: string;
  contactCellPhone: string;
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  documentCondition: string;
  email: string;
  firstName: string;
  lastName: string;
  mainLivingPlace: string;
  mortgage: string;
  observations: string;
  partOfPayment: string;
  power: string;
  powerCondition: string;
  propertyOrigin: string;
}

export interface PropertyFile {
  id: string,
  imageData: string | null,
  imageType: string | null,
  label: string,
  type: string,
  values: string,
  value: string,
  name: string
}

interface PropertyLocation {
  avenue: string;
  buildingNumber: string;
  isClosedStreet: string;
  location: string;
  howToGet: string;
  buildingShoppingcenter: string;
  city: string;
  country: string;
  floor: string;
  hotToGet: string;
  municipality: string;
  parkingLevel: string;
  parkingNumber: string;
  referencePoint: string;
  state: string;
  street: string;
  trunkLevel: string;
  trunkNumber: string;
  urbanization: string;
}

interface PropertyGeneralData {
  code: string;
  commisionRentalType: string | null;
  commisionRentalTypeSeller: string | null;
  commisionRoyalty: string | null;
  commisionRoyaltySeller: string | null;
  company: string;
  description: string;
  externalCompany: string | null;
  externalFistName: string | null;
  externalIdentification: string | null;
  externalLastName: string | null;
  externalObservations: string | null;
  externalPhoneNumber: string | null;
  footageBuilding: string;
  footageGround: string;
  operationType: string;

  propertyCondition: string;
  propertyType: string;
  property_status: string;
  sellerId: string | null;
  userId: number;
}

interface PublicationSourceData {
  instagram: boolean;
  facebook: boolean;
  tiktok: boolean;
  mercadolibre: boolean;
  conlallave: boolean;
  whatsapp: boolean

}

interface PropertyImage {
  id: string;
  imageData: string;
  imageType: string;

}
