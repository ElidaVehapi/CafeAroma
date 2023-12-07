export default {
    data() {
        return {
            password: "",
            quality: "Bad",
        }
    },
    methods: {
        check: function () {
            if (this.password.length > 8) {
                this.quality = "Good";
            } else {
                this.quality = "Bad";
            }
        },
        reset: function () {
            this.password = "";
            this.quality = "Bad";
        }
    }
}