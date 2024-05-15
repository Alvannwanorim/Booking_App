export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
  address: string;
  patients: string | null;
  years_of_experience: string | null;
  start_time: string;
  end_time: string;
  about: string | null;
  phone: string | null;
  category: Category[];
}

export interface SearchParams {
  query?: string;
  category?: string;
  id?: string;
  cname?: string;
  [key: string]: any;
}

export interface TimeSlot {
  time: string;
}
