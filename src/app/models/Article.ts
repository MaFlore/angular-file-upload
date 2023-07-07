export class Article{

  id: number;
  designation: string;
  description!: Text;
  prixUnitaire: number;

  constructor(){
    this.id = 0;
    this.designation = '';
    this.prixUnitaire = 0;
  }
}
