
const { createApp } = Vue;

createApp({
  async created() {
    this.fetchCat();
  },

  methods: {
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // cat stringify
    // represent a number in car emoji
    cs(number) {
      let catString = "";
      while (number > 0) {
        catString += "🐱";
        number--;
      }
      return catString;
    },

    yesOrNo(number){
      if (number) {
        return "Yes";
      }
      return "No";
    },

    async fetchCat() {
      this.loading = "Loading cat... 🙀";
      let random = this.randomIntFromInterval(0, breeds.length - 1);
      let randomBreed = breeds[random];

      let toFetch =
        this.endpoint +
        new URLSearchParams({
          breed_id: randomBreed,
          size: "thumb",
        });
      let res = await fetch(toFetch, {
        headers: new Headers({
          'x-api-key': API_KEY
        })
      });

      let cat = await res.json();

      this.url = cat[0].url;
      this.catInfo = cat[0].breeds[0];

      this.loading = " ";
      //console.log(cat[0].breeds[0]);
    },
  },

  data() {
    return {
      endpoint: "https://api.thecatapi.com/v1/images/search?",
      url: "",
      catInfo: {},
      loading: "Loading cat... 🙀"
    };
  },
}).mount("#app");
