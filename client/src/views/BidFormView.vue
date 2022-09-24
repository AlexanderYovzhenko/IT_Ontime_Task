<template>
  <div class="bidForm">
    <h2 class="bid-title">Заявка</h2>
    <form class="form" @submit.prevent="addBid">
      <div class="form__group field">
        <input
          type="text"
          class="form__field"
          v-model="name"
          placeholder="Name"
          name="name"
        />
        <label for="name" class="form__label">Название</label>
      </div>
      <div class="form__group field">
        <input
          type="text"
          class="form__field"
          v-model="description"
          placeholder="Name"
          name="name"
        />
        <label for="name" class="form__label">Описание</label>
      </div>
      <div class="form__group field">
        <input
          type="date"
          class="form__field"
          v-model="date"
          placeholder="Name"
          name="name"
        />
        <label for="name" class="form__label">Дата</label>
      </div>
      <button class="button button-submit">Отправить</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      description: "",
      date: "",
    };
  },
  methods: {
    async addBid() {
      const bidRequest = {};
      bidRequest.name = this.name;
      bidRequest.description = this.description;
      bidRequest.date = this.date;
      if (this.name === "" || this.description === "" || this.date === "") {
        alert("Заполните все поля!");
        return;
      }
      const res = await axios.post("http://localhost:3000/bids", bidRequest);
      if (res.status === 201) {
        this.name = "";
        this.description = "";
        this.date = "";
      }
    },
  },
};
</script>

<style scoped>
.bidForm {
  padding: 50px 10px;
}
.bid-title {
  font-size: 33px;
  color: teal;
  text-align: center;
  margin: 10px 0 30px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.button-submit {
  margin: 50px 0;
}

/* styles for inputs */
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__field::placeholder {
  color: transparent;
}
.form__field:placeholder-shown ~ .form__label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight: 700;
}
/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
