<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <input v-model="find">
    <button @click="getData">find</button>
    <ul>
      <li>{{json_data}}</li>
    </ul>
  </section>
</template>

<script>
  const axios = require('axios');

  let url = "https://nuxt-firebase-app-5b6cc.firebaseio.com/person/";

  export default {
    data: function(){
      return {
        title: 'Axios',
        message: 'axios sample',
      };
    },
    methods: {
      getData: function(){
        let id_url = url + this.find + '.json';
        axios.get(id_url).then((res) => {
          this.message = 'get ID=' + this.find;
          this.json_data = res.data;
      }).catch((error) => {
        this.message = 'ERROR';
        this.json_data = {};
      });
    }
  }
}
</script>

<style>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60px;
  color: #345980;
}
p {
  padding-top: -5px;
  font-size: 20px;
}
div {
  font-size: 14px;
}
pre {
  padding: 10px;
  font-size: 18px;
  background-color: #efefef;
  word-spacing: pre-wrap;
}
hr {
  margin: 10px 0;
}
tr th {
  width: 150px;
  background-color: darkblue;
  color: white;
  font-size: 16px;
}
tr td {
  padding: 5px 10px;
  background-color: #eef;
  font-size: 14px;
}
input {
  font-size: 14px;
}
button {
  font-size: 14px;
}
ul {
  margin: 0 10px;
  background-color: aliceblue;
}
li {
  padding: 10px;
  font-size: 16px;
}
</style>


