import { Component } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/Article';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  voirListeArticles: boolean = true;
  voirFormulaireAjout: boolean = false;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  article = this.articleService.article;
  articles : Article[] = [];
  messageErreur: string = "";
  articleData: FormData = new  FormData();
  APIEndpoint: string;
  articleForm: any;
  imageFile: any;
  imagePath: any;
  imgURL: any;

  constructor(private articleService: ArticlesService) {
    this.APIEndpoint = environment.APIEndpoint;
  }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      designation: new FormControl(this.article.designation, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required]),
      prixUnitaire: new FormControl(this.article.prixUnitaire, [Validators.required]),
      //image: new FormControl(null, [this.imageValidator.bind(this)])
    })
    console.log(this.listeArticles());
  }

  // imageValidator(control: AbstractControl): { [key: string]: any } | null {
  //   const file = control.value;
  //   if (file && file.length > 0) {
  //     const mimeType = file[0].type;
  //     if (!mimeType || !mimeType.match(/image\/*/)) {
  //       return { invalidMimeType: true };
  //     }
  //   } else {
  //     return { required: true };
  //   }
  //   return null;
  // }



  //Méthode de la liste de tous les articles à partir de ArticlesService
  listeArticles():void{
    this.articleService.getAll().subscribe(response=>{
      this.articles = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListeArticles = false;
    this.voirFormulaireAjout = true;
    this.article = new Article();
  }

  get designation(){
    return this.articleForm.get('designation');
  }

  get description(){
    return this.articleForm.get('description');
  }

  get prixUnitaire(){
    return this.articleForm.get('prixUnitaire');
  }

  //Méthode de retour sur la page de la liste des articles
  retour(): void {
    this.voirListeArticles = true;
    this.voirFormulaireAjout = false;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'un article à partir de ArticlesService
  ajoutArticle(): void {
    const formValues = {
      designation: this.articleForm.value.designation,
      description: this.articleForm.value.description,
      prixUnitaire: this.articleForm.value.prixUnitaire
    };

    this.articleData.append('article', JSON.stringify(formValues));
    this.articleData.append('image', this.imageFile);

    this.articleService.addArticle(this.articleData).subscribe(
      (response) => {
        console.log(response);
        if(response.id > 0) {
          this.listeArticles();
          this.retour()
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, article déjà existant"
          this.afficherFormulaireAjouter();
          this.article.description = response.description;
          this.article.designation = response.designation;
          this.article.prixUnitaire = response.prixUnitaire;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onSelectFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.imageFile = file;

      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/) == null){
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      console.log(file)
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
      this.imgURL = reader.result;
      }
    }
  }

  //Méthode de détail d'un article à partir de ArticlesService
  detailArticle(id: number): void {
    console.log(id)
    this.articleService.findById(id).subscribe(response=>{
      this.article = response;
    })
  }

  //Méthode d'affichage de la page de detail d'un article
  afficherPageDetail(id: number): void {
    this.voirListeArticles = false;
    this.voirFormulaireAjout = false;
    this.voirPageDetail = false;
    this.detailArticle(id);
  }
}
