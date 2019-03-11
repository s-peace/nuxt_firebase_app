<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <table>
      <tr>
        <th>Email</th>
        <td><input v-model="email"></td>
      </tr>
      <tr>
        <th>Name</th>
        <td><input v-model="username"></td>
      </tr>
      <tr>
        <th>Age</th>
        <td><input type="number" v-model="age"></td>
      </tr>
      <tr>
        <th>Tel</th>
        <td><input v-model="tel"></td>
      </tr>
      <tr>
        <th></th>
        <td><button @click="addData">Add/Update</button></td>
      </tr>
      <tr>
        <th></th>
        <td>
            <button @click="getData">Search</button>
            <input v-model="search">
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="deleteData">Delete</button>
          <input v-model="email"></td>
      </tr>
    </table>
    
    
    <ul v-for="(data,key) in json_data">
      <li><strong>{{key}}</strong><br>{{data}}</li>
    </ul>
    

  </section>
</template>

<script>
  import firebase from 'firebase';
  const axios = require('axios');

  let url = "https://nuxt-firebase-app-5b6cc.firebaseio.com/person";

  export default {
    created: function(){
      // Initialize Firebase
      let config = {
        apiKey: "AIzaSyCCHSPN89TWX8IYpd5zRzSAytRhRDueMP0",
        authDomain: "nuxt-firebase-app-5b6cc.firebaseapp.com",
        databaseURL: "https://nuxt-firebase-app-5b6cc.firebaseio.com",
        projectId: "nuxt-firebase-app-5b6cc",
        storageBucket: "nuxt-firebase-app-5b6cc.appspot.com",
        messagingSenderId: "836571126469"
      };
      firebase.initializeApp(config);

      let provider = new firebase.auth.GoogleAuthProvider();
      let self = this;
      firebase.auth().signInWithPopup(provider).then(function(result) {
        self.message = result.user.displayName + ', '
        + result.user.email;
      })

      this.getAllData();
    },
    data: function(){
      return {
        title: 'Axios',
        email: '',
        username: '',
        tel: '',
        age: 0,
        search: '',
        message: 'axios sample',
        json_data: {},
      };
    },
    methods: {
      getData: function(){
        // let range = this.search;
        // let age_url = url + "&startAt=" + range[0]
          // + "&endAt=" + range[1]
          ;
        let search_url = url + ".json?orderBy=%22$key%22&equalTo=%22";
        axios.get(search_url + this.search + '%22').then((res) => {
          // this.message = 'get: ' + range[0] + ' < age < ' + range[1];
          this.message = 'get search data';
          this.json_data = res.data;
        }).catch((error) => {
          this.message = 'ERROR';
          this.json_data = {};
        });
      },
      getAllData: function(){
        let all_url = url + '.json'; 
        axios.get(all_url).then((res) => {
          this.message = "get all data!";
          this.json_data = res.data;
        })
      },
      addData: function(){
        let add_url = url + '/' + this.email + '.json';
        let data = {
          'name': this.username,
          'age':this.age,
          'tel':this.tel
        };
        axios.put(add_url,data).then((re) => {
          this.email = '';
          this.age = 0;
          this.tel = '';
          this.getAllData();
        });
      },
      deleteData: function(){
        let del_url = url + '/' +this.email + '.json';
        axios.delete(del_url).then((res) => {
          this.message = "this.email" + 'deleted!';
          this.email = '';
          this.getAllData();
        });
      },
    },
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


