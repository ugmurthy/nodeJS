# This call sends an email to one recipient, using a validated sender address
# Do not forget to update the sender address used in the sample
curl -v \
  -X POST \
  --user "$MJ_APIKEY_PUBLIC:$MJ_APIKEY_PRIVATE" \
  https://api.mailjet.com/v3/send \
  -H 'Content-Type: application/json' \
  -d '{
    "FromEmail":"murthy.udupa@muvesolutions.in",
    "FromName":"MUVE Solution LLP",
    "Subject":"First Test Email!",
    "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
    "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
    "Recipients":[
        {
            "Email": "artofrunning2015@gmail.com"
        }
    ]
  }'

