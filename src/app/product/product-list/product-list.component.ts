import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;
  dtOptions: any;
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getDataTable();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  getDataTable() {
    this.dtOptions = {
      "ajax": {
        url: 'http://localhost:8000/api/products',
        type: 'GET',
        dataSrc: ''
      },
      columns: [
        {
          "data": 'imageUrl',
          "render": function (data) {
            return '<img src="' + data + '" width="75px" height="100px">';
          }
        },
        {
          "title": 'Kitap Adı',
          "data": 'name'
        },
        {
          "title": 'Yazar',
          "data": 'author'
        },
        {
          "title": 'Fiyat',
          "data": 'price'
        },
        {
          data: 'id',
          className: 'text-center',
          orderable: false,
          render: (data: any, type: any) => {
            return `
                      <a href="/productDetail/` + data + `" class="cursor-pointer actionView" title="View">
                          <i class="fa fa-file-text-o"></i>
                      </a>
                  `;
          }
        }

      ],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        $('.actionView', row).unbind('click');
        $('.actionView', row).bind('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.router.navigate(['/productEdit', data.id]);
        });
        return row;
      },
      "paging": true,
      "ordering": true,
      "info": true,
      "pagingType": "full_numbers",
      "search": "Ara:",
      "language": {
        "lengthMenu": "_MENU_ Adet kayıt göster",
        "zeroRecords": "Kayıt bulunamadı",
        "info": "_PAGES_ Adet Sayfadan _PAGE_. Gösteriliyor",
        "infoEmpty": "Kayıt bulunamadı",
        "infoFiltered": "(Toplam _MAX_ adet kayıt)",
        "paginate": {
          "first": "Birinci",
          "last": "Sonuncu",
          "next": "İleri",
          "previous": "Geri"
        },
      }
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

  test(id) {
    alert(id);
  }


}
