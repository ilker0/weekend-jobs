<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import sectors from '@/constants/sectors'
import regions from '@/constants/regions'
import currencies from '@/constants/currencies'
import { supabase } from '@/supabase'

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
        week: 1,
        price: null,
        currency: 'USD',
        phone: null,
        description: null,
        region: null,
        city: null,
        email: null
      },
      loading: false,
      cityLoading: false,
      sectors,
      regions,
      currencies,
      cities: [],
      submitError: false
    }
  },

  validations() {
    return {
      form: {
        owner: { required },
        name: { required },
        sector: { required },
        week: { required },
        region: { required },
        city: { required },
        phone: { required },
        email: { required, email }
      }
    }
  },

  methods: {
    async save() {
      try {
        this.loading = true

        const {
          owner,
          name,
          sector,
          week,
          price,
          currency,
          phone,
          description,
          city,
          email
        } = this.form
        await supabase.from('jobs').insert([
          {
            owner,
            name,
            sector,
            week,
            price,
            currency,
            phone,
            description,
            city,
            email
          }
        ])

        this.$router.push({ name: 'jobs' })
      } catch {
        this.submitError = true

        setTimeout(() => {
          this.submitError = false
        }, 3000)
      } finally {
        this.loading = false
      }
    },

    async submit() {
      const result = await this.v$.$validate()

      if (!result) {
        return
      }

      this.save()
    },

    async onChangeRegion() {
      try {
        this.cityLoading = true
        const { data } = await supabase
          .from('cities')
          .select('id, name, region')
          .eq('region', this.form.region)

        this.cities = data
        this.form.city = null
      } finally {
        this.cityLoading = false
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
              !v$.form.sector.$error && 'select-bordered',
              v$.form.sector.$error && 'input-error'
            ]"
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
              !v$.form.week.$error && 'select-bordered',
              v$.form.week.$error && 'input-error'
            ]"
            v-model="form.week"
          >
            <option :value="null" disabled selected>
              Select your job duration
            </option>
            <option :value="1">One Week</option>
            <option :value="2">Two Week</option>
            <option :value="3">Three Week</option>
            <option :value="4">Four Week</option>
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
              <option
                v-for="currency in currencies"
                :key="currency.value"
                :value="currency.value"
              >
                {{ currency.emoji }} ({{ currency.name }})
              </option>
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
                !v$.form.region.$error && 'select-bordered',
                v$.form.region.$error && 'input-error'
              ]"
              v-model="v$.form.region.$model"
              @change="onChangeRegion"
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
          </div>

          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold"
                >City <span class="text-red-500">*</span>
              </span>
            </label>

            <select
              :class="[
                'select',
                'font-normal',
                'w-full',
                !v$.form.city.$error && 'select-bordered',
                v$.form.city.$error && 'input-error'
              ]"
              v-model="v$.form.city.$model"
            >
              <option :value="null" disabled selected>Select city</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>

            <label class="label" v-if="cityLoading">
              <span class="label-text-alt">Loading...</span>
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

        <div v-if="submitError" class="alert shadow-lg alert-error mt-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error!</span>
          </div>
        </div>
      </div>
      <div class="col-span-3 lg:col-span-1"></div>
    </div>
  </div>
</template>
