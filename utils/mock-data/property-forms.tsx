import React from "react";
import {propertyAccordionStatus} from "../constants";
import HandymanIcon from "@mui/icons-material/Handyman";
import {
  AttributesInformationForm, FilesForm,
  GeneralInformationForm,
  LocationInformationForm, NegotiationInformationForm, PropertyImagesForm, PublicationSourceForm
} from "../../components/ui/admin/properties/createForm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ArticleIcon from "@mui/icons-material/Article";
import ShareIcon from '@mui/icons-material/Share';

interface PanelProps {
  id: string;
  title: string;
  state: string;
  icon: JSX.Element;
  content: JSX.Element;
}

export const panels: PanelProps[] = [
  {
    id: 'panel1',
    state: propertyAccordionStatus.generalInformation,
    title: 'Informacion general',
    icon:  <HandymanIcon />  ,
    content: < GeneralInformationForm/>
  },
  {
    id: 'panel2',
    state: propertyAccordionStatus.locationInformation,
    title: 'Ubicacion de inmueble',
    icon: < LocationOnIcon/>,
    content: < LocationInformationForm/>
  },
  {
    id: 'panel3',
    state: propertyAccordionStatus.imagesInformation,
    title: 'Fotografias y videos de inmueble',
    icon: < PermMediaIcon/>,
    content: <PropertyImagesForm/>
  },
  {
    id: 'panel4',
    state: propertyAccordionStatus.attributesInformation,
    title: 'Caracteristicas del inmueble',
    icon: < ListAltIcon/>,
    content: < AttributesInformationForm/>
  },
  {
    id: 'panel5',
    state: propertyAccordionStatus.clientDataInformation,
    title: 'Datos de negociacion y cliente',
    icon: < HandshakeIcon/>,
    content: < NegotiationInformationForm/>
  },
  {
    id: 'panel6',
    state: propertyAccordionStatus.filesInformation,
    title: 'Documentos legales',
    icon: < ArticleIcon/>,
    content: < FilesForm/>
  },
  {
    id: 'panel7',
    state: propertyAccordionStatus.publicationSourceInformation,
    title: 'Fuente de publicacion',
    icon: < ShareIcon/>,
    content: < PublicationSourceForm/>
  },
]
