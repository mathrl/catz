

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

        async fetchCat() {
          let random = this.randomIntFromInterval(0, breeds.length - 1);
          let randomBreed = breeds[random];

          let toFetch =
            this.endpoint +
            new URLSearchParams({
              breed_id: randomBreed,
              size: 'thumb'
            });
          let res = await fetch(toFetch);
          let cat = await res.json();

          this.url = cat[0].url;
          this.catInfo = cat[0].breeds[0];

          console.log(cat[0].breeds[0]);
        },
      },

      data() {
        return {
          apiKey: "1f9225bc-14b7-4b63-8f78-b5f53a066ab7",
          endpoint: "https://api.thecatapi.com/v1/images/search?",
          url: "",
          catInfo: {},
        };
      },
    }).mount("#app");