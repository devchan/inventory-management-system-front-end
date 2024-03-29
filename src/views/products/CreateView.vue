<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createProduct") }}</h1>
    </div>
    <ProductForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import ProductForm from "@/components/forms/ProductForm.component.vue";
import productsService from "@/services/products.service";
import { productModel } from "@/utilities/models.utility";

export default {
  name: "CreateProductView",
  components: { ProductForm },
  data() {
    return {
      initialData: { ...productModel },
      avatar: process.env.VUE_APP_API_URL.replace(
        "/api/",
        "/images/default_user.jpg"
      ),
    };
  },
  methods: {
    handleSave(payload) {
      productsService.createProduct(payload).then(() => {
        this.$router.push({ name: "products" });
      });
    },
  },
};
</script>
