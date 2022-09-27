<template>
  <div class="bids" v-if="!isOpenForm">
    <h2 class="bids-title">Заявки</h2>
    <div class="bids-list" v-for="(bid, index) in bids" :key="bid.id">
      <div class="bid">
        <span>{{ index + 1 }}</span>
        {{ bid.name }}
      </div>
      <div class="bid-buttons">
        <button class="button button-refactor" @click="bidRefactor(bid)">
          Редактировать
        </button>
        <button class="button button-delete" @click="deleteBid(bid)">
          Удалить
        </button>
      </div>
    </div>
    <button
      class="button button-add"
      @click="
        isOpenForm = !isOpenForm;
        isFormRefactor = false;
      "
    >
      Добавить заявку
    </button>
  </div>
  <div class="bidForm" v-if="isOpenForm">
    <h2 class="bid-title">Заявка</h2>
    <form class="form" @submit.prevent="submit">
      <div
        class="container-form"
        v-for="(input, index) in fieldsForm"
        :key="index"
      >
        <div class="form__group field">
          <input
            v-if="input.type !== 'textarea'"
            :type="input.type"
            class="form__field"
            v-model="bidData[input.name]"
            placeholder="input.placeholder"
            name="input.name"
            v-bind:required="input.required"
          />
          <textarea
            v-else
            :type="input.type"
            class="form__field"
            v-model="bidData[input.name]"
            placeholder="input.placeholder"
            name="input.name"
            v-bind:required="input.required"
          />
          <label for="input.name" class="form__label">{{ input.value }}</label>
        </div>
      </div>
      <button class="button button-submit">Отправить</button>
    </form>

    <button
      class="button"
      @click="
        isOpenForm = !isOpenForm;
        cleanFormValue();
      "
    >
      ↞
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    axios,
  },
  data() {
    return {
      bids: null,
      isOpenForm: false,
      isFormRefactor: false,
      bidData: {},
      idBid: "",
      fieldsForm: [
        {
          type: "text",
          name: "name",
          placeholder: "Название",
          required: false,
          value: "Название",
        },
        {
          type: "textarea",
          name: "description",
          placeholder: "Описание",
          required: false,
          value: "Описание",
        },
        {
          type: "date",
          name: "date",
          placeholder: "Дата",
          required: false,
          value: "Дата",
        },
      ],
    };
  },
  methods: {
    submit() {
      this.isFormRefactor ? this.putBid() : this.addBid();
    },
    async getBids() {
      const bidsRes = await axios.get("http://localhost:3000/bids");
      this.bids = bidsRes.data.map((bid) => {
        const { _id: id, bidRows } = bid;
        return { id, ...bidRows };
      });
      return;
    },
    async addBid() {
      const res = await axios.post("http://localhost:3000/bids", this.bidData);
      if (res.status === 201) {
        this.cleanFormValue();
        alert("Ваша заявка отправлена!");
        this.getBids();
      }
    },
    async putBid() {
      const res = await axios.put(
        `http://localhost:3000/bids?id=${this.idBid}`,
        this.bidData
      );
      if (res.status === 201) {
        alert("Ваша заявка изменена!");
        this.getBids();
      }
    },
    async deleteBid(bidObj) {
      const res = await axios.delete(
        `http://localhost:3000/bids?id=${bidObj.id}`
      );
      if (res.status === 204) {
        this.bids = this.bids.filter((bid) => bid.id !== bidObj.id);
      }
    },
    bidRefactor(bid) {
      this.isOpenForm = !this.isOpenFom;
      this.isFormRefactor = true;
      this.idBid = bid.id;
      delete bid.id;
      this.bidData = { ...bid };
    },
    cleanFormValue() {
      this.bidData = Object.fromEntries(
        Object.entries(this.bidData).map(([key, value]) => [key, (value = "")])
      );
    },
  },
  mounted() {
    this.getBids();
  },
};
</script>

<style>
.bids {
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  row-gap: 20px;
  font-size: 20px;
  padding-bottom: 50px;
}
.bids-title {
  font-size: 33px;
  color: teal;
  text-align: center;
  margin: 50px 0;
}
.button {
  font-family: inherit;
  font-weight: 500;
  font-size: 16px;
  padding: 0.7em 1.4em 0.7em 1.1em;
  background: #ad5389;
  background: linear-gradient(0deg, #009688 0%, rgba(102, 247, 113, 1) 100%);
  border: none;
  box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
  letter-spacing: 0.05em;
  border-radius: 20em;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button:hover {
  box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
  text-decoration: underline;
}
.button:active {
  box-shadow: 0 0.3em 1em -0.5em #14a73e98;
  transform: translateY(2px);
}
.button-add {
  margin-top: 50px;
  align-self: center;
}

.bids-list {
  display: flex;
  justify-content: space-between;
  row-gap: 10px;
  flex-wrap: wrap;
}
.bid {
  margin-right: 10px;
}
.bid span {
  margin-right: 10px;
  border: 1px dashed teal;
  border-radius: 50%;
  padding: 0 9px 2px;
}
.bid-buttons {
  display: flex;
  justify-content: right;
  row-gap: 10px;
  flex-wrap: wrap;
}
.button-refactor {
  background: linear-gradient(
    0deg,
    rgb(84, 84, 219) 0%,
    rgba(102, 247, 113, 1) 100%
  );
}
.link-refactor:hover {
  background-color: inherit;
}
.button-delete {
  margin-left: 10px;
  background: linear-gradient(
    0deg,
    rgb(223, 89, 89) 0%,
    rgba(102, 247, 113, 1) 100%
  );
}

@media (min-width: 1024px) {
  .bids {
    min-height: 100vh;
  }
}

/* Form */

.bidForm {
  padding: 50px 10px;
}
.bid-title {
  font-size: 33px;
  color: teal;
  text-align: center;
  margin: 10px 0 30px;
}
.container-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.button-submit {
  align-self: flex-end;
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
.form__field[type="textarea"] {
  min-height: 150px;
  padding-right: 5px;
  overflow-wrap: break-all;
}
/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
