<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {}
    }
  }
}
</script>

<template>
  <div class="container mx-auto mt-10 mb-10">
    <div class="grid grid-cols-3 gap-10">
      <div class="col-span-3 lg:col-span-2 bg-gray-200 p-7">
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
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Sector<span class="text-red-500"> *</span></span
            >
          </label>

          <select class="select w-full font-normal">
            <option disabled selected>Select your job sector</option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Duration<span class="text-red-500"> *</span></span
            >
          </label>

          <select class="select w-full font-normal">
            <option disabled selected>Select your job duration</option>
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
            />

            <select class="col-span-1 select w-full font-normal">
              <option disabled selected>Select currency</option>
              <option>$(Dollar)</option>
              <option>€(Euro)</option>
              <option>£(Sterlin)</option>
              <option>¥(Yen)</option>
              <option>₺(Turkish Lira)</option>
            </select>
          </div>
        </div>

        <div class="form-control w-full mt-5 grid grid-cols-2 gap-5">
          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold">Region</span>
            </label>

            <select class="col-span-1 select w-full font-normal">
              <option disabled selected>Select region</option>
              <option>$(Dollar)</option>
              <option>€(Euro)</option>
              <option>£(Sterlin)</option>
              <option>¥(Yen)</option>
              <option>₺(Turkish Lira)</option>
            </select>
          </div>

          <div class="col-span-1">
            <label class="label">
              <span class="label-text font-bold">City</span>
            </label>

            <select class="col-span-1 select w-full font-normal">
              <option disabled selected>Select city</option>
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
            class="input input-bordered w-full"
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
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mt-5">
          <label class="label">
            <span class="label-text font-bold"
              >Description <span class="text-red-500"></span
            ></span>
          </label>

          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          />
        </div>
        <button class="btn btn-wide btn-primary mt-5 ml-auto text-white block">
          Save (Free)
        </button>
      </div>
      <div class="col-span-3 lg:col-span-1">Sol</div>
    </div>
  </div>
</template>

<style></style>
