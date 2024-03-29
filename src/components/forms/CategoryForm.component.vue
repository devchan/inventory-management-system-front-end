<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-text class="secondary-font pa-3">
      <v-form ref="CategoryForm">
        <v-container class="mt-3">
          <v-row>
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
              />
            </v-col>

            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                class="text-capitalize mr-3"
                color="secondary"
                outlined
                :to="{ name: 'categories' }"
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
import { categoryModel } from "@/utilities/models.utility";
export default {
  name: "CategoryForm",
  props: ["handleSubmit", "initialData"],
  data() {
    return {
      formData: { ...categoryModel },
    };
  },
  watch: {
    initialData() {
      this.formData = this.initialData;
    },
  },
  methods: {
    handleSave() {
      if (this.$refs.CategoryForm.validate()) {
        this.handleSubmit(this.formData);
      }
    },
  },
};
</script>
