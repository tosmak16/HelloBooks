import $ from 'jquery';
import React from 'react';

global.$ = global.jQuery = $;

$.prototype.modal = () => { };

global.Materialize = {
  toast: () => { }
};
