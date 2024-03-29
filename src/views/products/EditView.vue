<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editProduct") }}</h1>
    </div>
    <ProductForm
      :handleSubmit="handleSave"
      :initialData="initialData"
      :avatar="avatar"
    />
  </v-container>
</template>

<script>
import ProductForm from "@/components/forms/ProductForm.component.vue";
import productsService from "@/services/products.service";
import functionsUtilities from "@/utilities/functions.utility";
import { productModel } from "@/utilities/models.utility";

export default {
  name: "EditProductView",
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
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      productsService.getProduct(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.category_id = response.data.category.id;
        this.avatar = response.data.image;
      });
    },
    handleSave(payload) {
      productsService.updateProduct(this.$route.params.id, payload).then(() => {
        this.$router.push({ name: "products" });
      });
    },
  },
};
</script>
