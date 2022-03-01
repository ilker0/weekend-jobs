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
        currency: 'USD',
        phone: null,
        description: null,
        region: null,
        city: null
      },
      loading: false,
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
            :class="[
              'input',
              'input-bordered',
              'w-full',
              v$.form.owner.$error && 'input-error'
            ]"
            v-model="v$.form.owner.$model"
          />
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
            :class="[
              'input',
              'input-bordered',
              'w-full',
              v$.form.name.$error && 'input-error'
            ]"
            v-model="v$.form.name.$model"
          />
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Sector<span class="text-red-500"> *</span></span
            >
          </label>

          <select
            v-model="v$.form.sector.$model"
            :class="[
              'select',
              'font-normal',
              'w-full',
              'select-bordered',
              v$.form.sector.$error && 'input-error'
            ]"
          >
            <option :value="null" disabled selected>
              Select your job sector 🔨
            </option>

            <option
              :value="sector.value"
              v-for="(sector, index) in sectors"
              :key="index"
            >
              {{ sector.emoji }} {{ sector.name }}
            </option>
          </select>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Duration<span class="text-red-500"> *</span></span
            >
          </label>

          <select
            :class="[
              'select',
              'font-normal',
              'w-full',
              'select-bordered',
              v$.form.week.$error && 'input-error'
            ]"
            v-model="form.week"
          >
            <option :value="null" disabled selected>
              Select your job duration
            </option>
            <option>One Week</option>
            <option>Two Week</option>
            <option>Three Week</option>
            <option>Four Week</option>
          </select>
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
              class="col-span-1 select w-full font-normal select-bordered"
              v-model="form.currency"
            >
              <option :value="null" disabled selected>Select currency</option>
              <option value="USD">$ (Dollar)</option>
              <option value="EUR">€ (Euro)</option>
              <option value="GBP">£ (Sterlin)</option>
              <option value="JPY">¥ (Yen)</option>
              <option value="TRY">₺ (Turkish Lira)</option>
            </select>
          </div>
        </div>

        <div class="form-control w-full mt-5 grid grid-cols-2 gap-5">
          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold"
                >Region<span class="text-red-500">*</span></span
              >
            </label>

            <select
              :class="[
                'select',
                'font-normal',
                'w-full',
                'select-bordered',
                v$.form.region.$error && 'input-error'
              ]"
              v-model="v$.form.region.$model"
            >
              <option :value="null" disabled selected>Select region 🗺️</option>
              <option
                :value="region.value"
                v-for="(region, index) in regions"
                :key="index"
              >
                {{ region.emoji }} {{ region.name }}
              </option>
            </select>
          </div>

          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold"
                >City <span class="text-red-500">*</span></span
              >
            </label>

            <select
              :class="[
                'select',
                'font-normal',
                'w-full',
                'select-bordered',
                v$.form.city.$error && 'input-error'
              ]"
              v-model="v$.form.city.$model"
            >
              <option :value="null" disabled selected>Select city</option>
              <option>$(Dollar)</option>
              <option>€(Euro)</option>
              <option>£(Sterlin)</option>
              <option>¥(Yen)</option>
              <option>₺(Turkish Lira)</option>
            </select>
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
            :class="[
              'input',
              'input-bordered',
              'w-full',
              v$.form.phone.$error && 'input-error'
            ]"
            v-model="v$.form.phone.$model"
          />
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
            :class="[
              'input',
              'input-bordered',
              'w-full',
              v$.form.email.$error && 'input-error'
            ]"
            v-model="v$.form.email.$model"
          />
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

        <div class="flex justify-end mt-5">
          <button
            @click="submit"
            :class="[
              'btn',
              'btn-wide',
              'btn-primary',
              'text-white',
              loading && 'loading'
            ]"
          >
            Save (Free)
          </button>
        </div>
      </div>
      <div class="col-span-3 lg:col-span-1"></div>
    </div>
  </div>
</template>
