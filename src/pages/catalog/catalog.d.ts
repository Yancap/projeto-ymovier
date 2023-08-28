import { Simplify } from "@prismicio/client/dist/types/value/types";
import { MoviesDocumentData } from '../../../prismicio-types'

export interface NewMoviesDocumentData extends Omit<MoviesDocumentData, "gender" | "poster" | "runtime"> {
    gender: string;
    poster: {
      url: string;
      alt: string
    }
    runtime: string;
  }
  
export interface CatalogProps{
movies: Simplify<NewMoviesDocumentData[]>;
signature: 'active' | 'canceled' | string;
}


export interface SignatureResponse {
signature: string | null;
}