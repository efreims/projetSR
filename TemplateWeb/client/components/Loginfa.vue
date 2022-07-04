<template>
    <div>
        Double authentification
        <form @submit.prevent="submitcode">
            <input type="txt" placeholder="Code 2FA" v-model="code">
            <button>Submit code </button>
        </form>
        <p style="color:red;" v-if="errormessagelogin2fa==1">Code incorrect</p>
    </div>
</template>

<script>
     module.exports = {
        name : "Loginfa",
        props: {
            resultlogin:Number,
            errormessagelogin2fa:Number
        },
        data(){
            return{
                code:""
            }
        },
        methods : {
            submitcode(){
                console.log('yes')
                this.$emit('login-fa',this.code)
                
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style>

