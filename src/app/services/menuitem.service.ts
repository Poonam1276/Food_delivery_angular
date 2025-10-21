import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface MenuItemCreateDto {
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  foodImage?: File;
}

export interface MenuItemUpdateDto {
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  foodImage?: string;
}

export interface MenuItemViewDto {
  itemId: number;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  category: string;
  foodImage?: string;
  restaurantId: number;
  restaurantName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private baseUrl = 'https://localhost:7004/api/MenuItem'; // Update if needed

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<MenuItemViewDto[]> {
  return this.http.get<MenuItemViewDto[]>(`${this.baseUrl}/get-all-Item`);
}

getItemById(id: number): Observable<MenuItemViewDto> {
  return this.http.get<MenuItemViewDto>(`${this.baseUrl}/get-by${id}`);
}

addItem(dto: MenuItemCreateDto): Observable<MenuItemViewDto> {
  const formData = new FormData();
  formData.append('name', dto.name);
  formData.append('description', dto.description || '');
  formData.append('price', dto.price.toString());
  formData.append('isAvailable', dto.isAvailable.toString());
  formData.append('category', dto.category);
  if (dto.foodImage) {
    formData.append('foodImage', dto.foodImage);
  }

  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post<MenuItemViewDto>(`${this.baseUrl}/add-item`, formData, { headers });
}

getItemsByRestaurant(restaurantId: number): Observable<MenuItemViewDto[]> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<MenuItemViewDto[]>(
    `${this.baseUrl}/get-by-restaurant/${restaurantId}`,
    { headers }
  );
}


updateItem(id: number, dto: MenuItemUpdateDto): Observable<void> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put<void>(`${this.baseUrl}/update-ItemBy${id}`, dto, { headers });
}
deleteItem(id: number): Observable<void> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete<void>(`${this.baseUrl}/delete-ById${id}`, { headers });
}


  }
