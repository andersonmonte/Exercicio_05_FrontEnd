import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo';
import { NgForm } from '@angular/forms';
import { QuantidadeMarcas } from './models/quantidademarcas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  veiculo = {} as Veiculo;
  veiculos: Veiculo[];
  quantidadeMarcas: QuantidadeMarcas[];
  quantidadeNaoVendidos: number;

  constructor(private veiculoService: VeiculoService) {}
  
  ngOnInit() {
    this.veiculo.vendido = false;
    this.getVeiculos();
  }

  // Define se um veículo será criado ou atualizado
  saveVeiculo(form: NgForm) {
    if (this.veiculo.id !== undefined) {
      this.veiculoService.updateVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.veiculoService.saveVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os veículos
  getVeiculos() {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => {
      this.veiculos = veiculos;
      // Atualiza a contagem de veículos não vendidos
      this.quantidadeNaoVendidos = this.veiculos.filter(v => v.vendido == false).length;
      // Atualiza a quantidade de veículos por marca
      
    });
  }

  // Deleta um veículo
  deleteVeiculo(veiculo: Veiculo) {
    this.veiculoService.deleteVeiculo(veiculo).subscribe(() => {
      this.getVeiculos();
    });
  }

  // Copia o veículo para ser editado.
  editVeiculo(veiculo: Veiculo) {
    this.veiculo = { ...veiculo };
  }

  // Limpa o formulário
  cleanForm(form: NgForm) {
    this.getVeiculos();
    form.resetForm();
    this.veiculo = {} as Veiculo;
  }

}
