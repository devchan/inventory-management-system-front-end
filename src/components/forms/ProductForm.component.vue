<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-text class="secondary-font pa-3">
      <v-form ref="productForm">
        <v-container class="mt-3">
          <v-row>
            <v-col cols="12 d-flex">
              <v-avatar size="100" class="mx-auto">
                <img :src="avatar" />
              </v-avatar>
            </v-col>
            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.name") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.name"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.category") }}
              </p>
              <v-select
                :items="categoryList"
                item-text="name"
                item-value="id"
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.category_id"
                hide-details="auto"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.quantity") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.quantity"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.price") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.price"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.image") }}
              </p>
              <v-file-input
                outlined
                dense
                validate-on-blur
                hide-details="auto"
                prepend-inner-icon="$file"
                prepend-icon=""
                show-size=""
                @change="handleFileChange"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="12">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.description") }}
              </p>
              <v-textarea
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.description"
                hide-details="auto"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                class="text-capitalize mr-3"
                color="secondary"
                outlined
                :to="{ name: 'products' }"
                exact
              >
                <v-icon small class="mr-1">mdi-cancel</v-icon>
                {{ $t("buttons.cancel") }}
              </v-btn>
              <v-btn
                class="text-capitalize"
                color="secondary"
                @click="handleSave"
              >
                <v-icon small class="mr-1">mdi-content-save</v-icon>
                {{ $t("buttons.save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import generalService from "@/services/general.service";
import { productModel } from "@/utilities/models.utility";
export default {
  name: "ProductForm",
  props: ["handleSubmit", "initialData", "avatar"],
  data() {
    return {
      categoryList: [],
      formData: { ...productModel },
    };
  },
  mounted() {
    this.getCategories();
  },
  watch: {
    initialData() {
      this.formData = this.initialData;
    },
  },
  methods: {
    getCategories() {
      generalService.getAllCategories().then((response) => {
        this.categoryList = response.data;
      });
    },
    handleSave() {
      if (this.$refs.productForm.validate()) {
        this.handleSubmit(this.formData);
      }
    },
    handleFileChange(file) {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.formData.image_file = reader.result;
        };
      } else {
        this.formData.image_file = null;
      }
    },
  },
};
</script>
