<template>
  <div class="bids">
    <h2 class="bids-title">Заявки</h2>
    <div class="bids-list" v-for="(bid, index) in bids" :key="bid.id">
      <div class="bid">
        <span>{{ index + 1 }}</span>
        {{ bid.name }}
      </div>
      <div class="bid-buttons">
        <button class="button button-refactor">Редактировать</button>
        <button class="button button-delete" @click="deleteBid(bid.id)">
          Удалить
        </button>
      </div>
    </div>
    <button class="button button-add">Добавить заявку</button>
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
    };
  },
  methods: {
    async deleteBid(id) {
      const res = await axios.delete(`http://localhost:3000/bids?id=${id}`);
      if (res.status === 204) {
        this.bids = this.bids.filter((bid) => bid.id !== id);
      }
    },
  },
  async mounted() {
    const bidsRes = await axios.get("http://localhost:3000/bids");
    this.bids = bidsRes.data.map((bid) => {
      const { _id: id, bidRows } = bid;
      return { id, ...bidRows };
    });
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
</style>
