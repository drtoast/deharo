# onLoad = ->
#   if $('#transactions form').length > 0
#     $amount_dollars = $('input[name=transaction_amount_dollars]')
#     $amount_cents = $('input#transaction_amount')
#     $all_shares = $('input.share')
#
#     $equalize_shares = $('.btn.shares.equalize')
#     $pay_rent = $('.btn.shares.pay-rent')
#     $all_personal_shares = $('input.share[data-account-kind=personal]')
#     $all_corporate_shares = $('input.share[data-account-kind=corporate]')
#
#     getTotalShares = ->
#       total = 0
#       for share in $all_shares
#         val = parseInt($(share).val())
#         total += val if val
#       total
#
#     formatDollars = (dollars) ->
#       # add at least two decimal places
#       dollars = dollars.toString().replace(/[^\d\.]/g, '')
#       dollars += '.' unless dollars.match(/\./)
#       dollars += '00'
#
#       # truncate to two decimal places
#       idx = dollars.indexOf('.')
#       dollars.substr(0, idx + 3)
#
#     updateAmountCents = ->
#       dollars = formatDollars($amount_dollars.val())
#
#       # very ugly workaround for floating point errors.
#       if dollars.indexOf('.') != -1
#         cents = dollars.replace(/\./, '')
#       else
#         cents = dollars * 100
#
#       $amount_cents.val(cents)
#
#     updateAmountDollars = ->
#       dollars = formatDollars($amount_cents.val() / 100.0)
#       $amount_dollars.val(dollars)
#
#     updateShareDollars = ->
#       for share in $all_shares
#         share_amount = $(share).val() || 0
#         account_id = $(share).data('account-id')
#         total_shares = getTotalShares()
#         if total_shares > 0
#           share_dollars = Math.round($amount_cents.val() * (share_amount / getTotalShares())) / 100
#         else
#           share_dollars = 0
#         share_dollars = formatDollars(share_dollars)
#
#         el = $(".share-dollars[data-account-id=#{account_id}]")
#         el.text("$#{share_dollars}")
#         el.toggleClass('text-warning', share_dollars != '0.00')
#
#     equalizeShares = (e) =>
#       e.preventDefault()
#       setShares(1, 0)
#
#     payRent = (e) =>
#       e.preventDefault()
#       setShares(0, 1)
#
#     setShares = (personal, corporate) =>
#       for share in $all_personal_shares
#         $(share).val(personal)
#       $all_corporate_shares.val(corporate)
#       recalculate()
#
#     recalculate = ->
#       updateAmountCents()
#       updateShareDollars()
#
#     $amount_dollars.on 'keyup', recalculate
#     $all_shares.on 'keyup', recalculate
#     $equalize_shares.on 'click', equalizeShares
#     $pay_rent.on 'click', payRent
#
#     updateAmountDollars()
#     recalculate()
#
# $(document).ready(onLoad)
# document.addEventListener('page:change', onLoad)
