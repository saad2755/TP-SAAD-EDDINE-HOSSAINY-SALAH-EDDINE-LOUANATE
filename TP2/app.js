const { createApp } = Vue;

createApp({
  data() {
    return {
      books: [
        { id: 1, title: "Le Petit Prince", author: "Saint-Exupéry", year: 1943, genre: "Roman", isFav: true, keywords: ["classique", "enfance"] },
        { id: 2, title: "1984", author: "George Orwell", year: 1949, genre: "Science-fiction", isFav: false, keywords: ["dystopie"] },
        { id: 3, title: "Dune", author: "Frank Herbert", year: 1965, genre: "Science-fiction", isFav: false, keywords: ["space", "aventure"] }
      ],
      // Objet lié au formulaire via v-model
      newBook: {
        title: "",
        author: "",
        year: null,
        genre: "",
        isFav: false,
        keywords: []
      },
      // Champ séparé pour la saisie des mots-clés
      nouveauMotCle: ""
    };
  },

  computed: {
    // TP2 §2 : Formulaire valide seulement si title et author sont remplis
    formulaireValide() {
      return this.newBook.title.trim() !== "" && this.newBook.author.trim() !== "";
    }
  },

  methods: {
    // TP2 §1 : Ajouter un livre
    ajouterLivre() {
      if (!this.formulaireValide) return;

      // Copie de newBook avec un nouvel id
      const nouvelId = this.books.length > 0 
        ? Math.max(...this.books.map(b => b.id)) + 1 
        : 1;

      this.books.push({
        ...this.newBook,
        id: nouvelId,
        keywords: [...this.newBook.keywords] // copie du tableau
      });

      // Réinitialisation de newBook
      this.newBook = {
        title: "",
        author: "",
        year: null,
        genre: "",
        isFav: false,
        keywords: []
      };
      this.nouveauMotCle = "";
    },

    // TP2 §3 : Supprimer un livre par id
    supprimerLivre(book) {
      const index = this.books.findIndex(b => b.id === book.id);
      if (index !== -1) {
        this.books.splice(index, 1);
      }
    },

    // TP2 §4 : Inverser le statut favori
    toggleFavori(book) {
      book.isFav = !book.isFav;
    },

    // TP2 §5 : Ajouter un mot-clé (sans doublon)
    ajouterMotCle() {
      const mot = this.nouveauMotCle.trim();
      if (mot !== "" && !this.newBook.keywords.includes(mot)) {
        this.newBook.keywords.push(mot);
      }
      this.nouveauMotCle = "";
    },

    // TP2 §5 : Retirer un mot-clé par index
    retirerMotCle(index) {
      this.newBook.keywords.splice(index, 1);
    }
  }
}).mount("#app");