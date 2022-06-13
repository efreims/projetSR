<template>
    <div>
        <form @submit.prevent="connexion">
            <input type="txt" placeholder="email" v-model="email">
            <input type="password" placeholder="mot de passe" v-model="password">
            <button>Connexion</button>
        </form>
    <div>
</template>

<script>
     module.exports = {
        name : "Home",
        data(){
            return{
                email:"",
                password:""
            }
        },
        methods : {
        
            connexion(){
                this.$emit("login-user",{email: this.email,password : this.password})
            }
    
        },
        
    }

</script>

<style>

