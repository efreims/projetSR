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
            <button>Inscritpion</button>
        </form>
        <button @click="changeform(true)">Log in</button>
        <button @click="changeform(false)">Sign in</button>
    <div>
</template>

<script>
     module.exports = {
        name : "Home",
        data(){
            return{
                email:"",
                password:"",
                log:false,
            }
        },
        methods : {
        
            connexion(){
                this.$emit("login-user",{email: this.email,password : this.password})
            },
            inscription(){
                this.$emit("sign-user",{email: this.email,password : this.password})
            },
            changeform(status){
                this.log = status
            }
    
        },
        
    }

</script>

<style>

