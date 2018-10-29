import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //produto vars
  productName:string;
  productImage:File;
  singleProduct:any;
  productsList:any;

  //categoria vars
  categoryName:any;
  singleCategory:any;
  categoriesList:any;

  //caracteristicas vars
  caracteristicName:string;
  caracteristicsList:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.categoriesList = "";
    this.getCategorias();
  }

  getCategorias() {
    this.http.get(environment.API_URL + "/api/v1/categorias").subscribe(
      res => this.categoriesList = res,
      error => console.log(error)
    )
  }

  onSubmitCategory() {
    this.http.post(environment.API_URL + "/api/v1/categorias",
      {nome: this.categoryName}).subscribe(
      res => this.getCategorias(),
      error => console.log(error)
    )
  }

  selectSingleCategory(category_id) {
    this.http.get(environment.API_URL + "/api/v1/categorias/" + category_id).subscribe(
      (res) => {
        this.singleCategory = res;
        this.getProducts(category_id);
      },
      error => console.log(error)
    )
  }

  deleteCategory(category_id) {
    this.http.delete(environment.API_URL + "/api/v1/categorias/" + category_id).subscribe(
      (res) => {
        this.getCategorias();
        this.singleCategory = ""
        this.singleProduct = ""
        this.caracteristicsList = "";
      },
      error => console.log(error)
    )
  }

  getProducts(category_id) {
    this.http.get(environment.API_URL + "/api/v1/categorias/"+ category_id +"/produtos").subscribe(
      res => this.productsList = res,
      error => console.log(error)
    )
  }

  selectSingleProduct(category_id, product_id){
    this.http.get(environment.API_URL + "/api/v1/categorias/"+ category_id +"/produtos/" + product_id).subscribe(
      res => this.singleProduct = res,
      error => console.log(error)
    )
  }

  onFileSelected(event) {
    this.productImage = <File>event.target.files[0];
  }

  onSubmitProduct(event, category_id) {
    const fd = new FormData();
    fd.append("nome", this.productName);
    fd.append("imagem", this.productImage, this.productImage.name);
    this.http.post(environment.API_URL + "/api/v1/categorias/" + this.singleCategory.id + "/produtos",
    fd).subscribe(
      res => this.getProducts(this.singleCategory.id),
      error => console.log(error)
    )
  }

  caracteristicSubmit() {
    this.http.post(environment.API_URL + "/api/v1/categorias/"+ this.singleCategory.id +"/produtos/"+this.singleProduct.id+"/caracteristicas",
      {nome: this.caracteristicName}).subscribe(
      (res) => {
        this.getCaracteristicsFromProduct(this.singleProduct.id);
        this.caracteristicName = "";
      },
      error => console.log(error)
    )
  }

  getCaracteristicsFromProduct(product_id) {
    this.http.get(environment.API_URL + "/api/v1/categorias/"+ this.singleCategory.id +"/produtos/"+product_id+"/caracteristicas").subscribe(
      res => this.caracteristicsList = res,
      error => console.log(error)
    )
  }

  downloadProductsCSV(category_id) {
    this.http.get(environment.API_URL + "/api/v1/categorias/"+ category_id +"/produtos.csv").subscribe(
      res => console.log(res),
      error => this.downloadFile(error.error.text)
    )
 
  }

  downloadFile(res) {
    const blob = new Blob([res], { type: 'text/csv' });
    saveAs(blob, "produtos.csv");
  }

}
