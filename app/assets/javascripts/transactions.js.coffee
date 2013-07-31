# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

onLoad = ->
  $amount_dollars = $('input[name=transaction_amount_dollars]')
  $amount_cents = $('input#transaction_amount')
  $all_shares = $('input.share')

  $equalize_shares = $('.btn.shares.equalize')
  $pay_rent = $('.btn.shares.pay-rent')
  $all_personal_shares = $('input.share[data-account-kind=personal]')
  $all_corporate_shares = $('input.share[data-account-kind=corporate]')

  total_shares = ->
    total = 0
    for share in $all_shares
      val = parseInt($(share).val())
      total += val if val
    total

  update_amount_cents = ->
    cents = $amount_dollars.val() * 100
    $amount_cents.val(cents)

  update_amount_dollars = ->
    $amount_dollars.val($amount_cents.val() / 100.0)

  update_share_dollars = ->
    for share in $all_shares
      share_amount = $(share).val()
      account_id = $(share).data('account-id')
      share_dollars = Math.round($amount_cents.val() * (share_amount / total_shares())) / 100
      $(".share-dollars[data-account-id=#{account_id}]").text("$#{share_dollars}")

  equalize_shares = =>
    set_shares(1, 0)

  pay_rent = =>
    set_shares(0, 1)

  set_shares = (personal, corporate) =>
    for share in $all_personal_shares
      $(share).val(personal)
    $all_corporate_shares.val(corporate)
    recalculate()

  recalculate = ->
    update_amount_cents()
    update_share_dollars()

  $amount_dollars.on 'keyup', recalculate
  $all_shares.on 'keyup', recalculate
  $equalize_shares.on 'click', equalize_shares
  $pay_rent.on 'click', pay_rent

  update_amount_dollars()
  recalculate()

$(document).ready(onLoad)
document.addEventListener('page:change', onLoad)
