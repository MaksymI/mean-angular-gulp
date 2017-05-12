export class MainController {
  constructor ($http) {
    'ngInject';
      this.$http = $http;
      this.getMessages();

  }
    getMessages(){
        this.$http.get('http://localhost:5000/api/message').then(function(result){
            console.log(result);
        });
    }
    
    postMessage(){
        this.$http.post('http://localhost:5000/api/message', {msg: this.message});
    }

}
