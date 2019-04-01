<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('mobile-icon.png') }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
  	<!-- CSRF Token -->
  	<meta name="csrf-token" content="{{ csrf_token() }}">
  	<!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
  </head>

  <body>
    <div id="app">
      <main
      v-if="$auth.ready()"
      :class="{ 'app' : $auth.check(), 'auth' : !$auth.check() }"
      class="view">
        <router-view></router-view>
      </main>
    </div>

    <!-- Scripts -->
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
  	<script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>
