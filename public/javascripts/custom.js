$(document).ready(function() {
  // tooltip
  $('[data-toggle="tooltip"]').tooltip();
  // datatable
  $('.table').DataTable();
});

function addEpi(){            
  window.location.href = '/admin/cad_epi/adicionar';
}

function cancelEpi(){  
  window.location.href = '/admin';
}

function EditarEpi(){  
  window.location.href = '/admin/cad_epi/editar';
}