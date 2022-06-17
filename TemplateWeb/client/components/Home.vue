<template>
    <div>
        
        <form v-if="log==true" @submit.prevent="connexion">
            <input type="txt" placeholder="email" v-model="email">
            <input type="password" placeholder="mot de passe" v-model="password">
            <button>Connexion</button>
        </form>
        <form v-if="log==false" @submit.prevent="inscription">
            <input type="txt" placeholder="email" v-model="email">
            <input type="password" placeholder="mot de passe" v-model="password">
            <input type="txt" placeholder="name" v-model="name">
            <input type="password" placeholder="city" v-model="city">
            <button>Inscritpion</button>
        </form>
        <button @click="changeform(true)">Log in</button>
        <button @click="changeform(false)">Sign in</button>
    <div>
</template>

<script>
     module.exports = {
        name : "Home",
        props : {
            resultlogin:Number,
        },
        data(){
            return{
                email:"",
                password:"",
                name:"",
                city:"",
                log:false,
            }
        },
        methods : {
        
            connexion(){
                this.$emit("login-user",{email: this.email,password : this.password})
            },
            inscription(){
                this.$emit("sign-user",{email: this.email,password : this.password,name:this.name,city:this.city})
            },
            changeform(status){
                this.log = status
            }
    
        },
        mounted(){
            console.log('result-login : ' + this.resultlogin)
            if (this.resultlogin==1){
                this.$emit('return-accueil')
            }
        }
        
    }

</script>

<style>

