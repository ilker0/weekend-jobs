<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import sectors from '@/constants/sectors'
import regions from '@/constants/regions'

export default {
  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      form: {
        owner: null,
        name: null,
        sector: null,
        week: null,
        price: null,
        currency: null,
        phone: null,
        description: null,
        region: null,
        city: null
      },
      sectors,
      regions
    }
  },

  validations() {
    return {
      form: {
        owner: { required },
        name: { required },
        sector: { required },
        week: { required },
        sector: { required },
        region: { required },
        city: { required },
        phone: { required },
        email: { required, email }
      }
    }
  },

  methods: {
    async submit() {
      const result = await this.v$.$validate()
      if (!result) {
        return
      }
    }
  }
}
</script>

<template>
  <div class="container mx-auto mt-10 mb-10">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-3 lg:col-span-2 bg-gray-200 p-7 rounded-lg">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold"
              >Name Surname / Company Name
              <span class="text-red-500">*</span></span
            >
          </label>

          <input
            type="text"
            placeholder="Example: John Doe"
            class="input input-bordered w-full"
            v-model="v$.form.owner.$model"
          />

          <label class="label pt-0" v-if="v$.form.owner.$error">
            <span class="label-text-alt text-red-500">Value is required</span>
          </label>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Job Name <span class="text-red-500">*</span></span
            >
          </label>

          <input
            type="text"
            placeholder="Example: Electrician"
            class="input input-bordered w-full"
            v-model="v$.form.name.$model"
          />

          <label class="label pt-0" v-if="v$.form.name.$error">
            <span class="label-text-alt text-red-500">Value is required</span>
          </label>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Sector<span class="text-red-500"> *</span></span
            >
          </label>

          <select
            class="select w-full font-normal"
            v-model="v$.form.sector.$model"
          >
            <option :value="null" disabled selected>
              Select your job sector
            </option>

            <option
              :value="sector.value"
              v-for="(sector, index) in sectors"
              :key="index"
            >
              {{ sector.emoji }} {{ sector.name }}
            </option>
          </select>

          <label class="label pt-0" v-if="v$.form.sector.$error">
            <span class="label-text-alt text-red-500">Value is required</span>
          </label>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Duration<span class="text-red-500"> *</span></span
            >
          </label>

          <select class="select w-full font-normal" v-model="form.week">
            <option :value="null" disabled selected>
              Select your job duration
            </option>
            <option>One Week</option>
            <option>Two Week</option>
            <option>Three Week</option>
            <option>Four Week</option>
          </select>

          <label class="label pt-0" v-if="v$.form.week.$error">
            <span class="label-text-alt text-red-500">Value is required</span>
          </label>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold">Price(Hour)</span>
          </label>

          <div class="grid grid-cols-3 gap-5">
            <input
              type="text"
              placeholder="Example: 10,00"
              class="col-span-2 input input-bordered w-full"
              v-model="form.price"
            />

            <select
              class="col-span-1 select w-full font-normal"
              v-model="form.currency"
            >
              <option :value="null" disabled selected>Select currency</option>
              <option>$ (Dollar)</option>
              <option>€ (Euro)</option>
              <option>£ (Sterlin)</option>
              <option>¥ (Yen)</option>
              <option>₺ (Turkish Lira)</option>
            </select>
          </div>
        </div>

        <div class="form-control w-full mt-5 grid grid-cols-2 gap-5">
          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold"
                >Region <span class="text-red-500">*</span></span
              >
            </label>

            <select
              class="col-span-1 select w-full font-normal"
              v-model="v$.form.region.$model"
            >
              <option :value="null" disabled selected>Select region</option>
              <option
                :value="region.value"
                v-for="(region, index) in regions"
                :key="index"
              >
                {{ region.emoji }} {{ region.name }}
              </option>
            </select>

            <label class="label pt-0" v-if="v$.form.region.$error">
              <span class="label-text-alt text-red-500">Value is required</span>
            </label>
          </div>

          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold"
                >City <span class="text-red-500">*</span></span
              >
            </label>

            <select
              class="col-span-1 select w-full font-normal"
              v-model="v$.form.city.$model"
            >
              <option :value="null" disabled selected>Select city</option>
              <option>$(Dollar)</option>
              <option>€(Euro)</option>
              <option>£(Sterlin)</option>
              <option>¥(Yen)</option>
              <option>₺(Turkish Lira)</option>
            </select>

            <label class="label pt-0" v-if="v$.form.city.$error">
              <span class="label-text-alt text-red-500">Value is required</span>
            </label>
          </div>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Phone Number <span class="text-red-500">*</span></span
            >
          </label>

          <input
            type="text"
            placeholder="Example: +1 999 999 99 99"
            class="input input-bordered w-full"
            v-model="v$.form.phone.$model"
          />

          <label class="label pt-0" v-if="v$.form.phone.$error">
            <span class="label-text-alt text-red-500">Value is required</span>
          </label>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >E-Mail <span class="text-red-500">*</span></span
            >
          </label>

          <input
            type="text"
            placeholder="Example: mail@mail.com"
            class="input input-bordered w-full"
            v-model="v$.form.email.$model"
          />

          <div
            class="input-errors"
            v-for="error of v$.form.email.$errors"
            :key="error.$uid"
          >
            <label class="label pt-0">
              <span class="label-text-alt text-red-500">{{
                error.$message
              }}</span>
            </label>
          </div>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Description <span class="text-red-500"></span
            ></span>
          </label>

          <ckeditor
            v-model="form.description"
            :editor="editor"
            :config="editorConfig"
          />
        </div>
        <button
          @click="submit"
          class="btn btn-wide btn-primary mt-5 ml-auto text-white block"
        >
          Save (Free)
        </button>
      </div>
      <div class="col-span-3 lg:col-span-1"></div>
    </div>
  </div>
</template>
