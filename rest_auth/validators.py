from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _
from django.contrib.auth.password_validation import CommonPasswordValidator

class CustomCommonPasswordValidator(CommonPasswordValidator):
    def validate(self, password, user=None):
        if password.lower().strip() in self.passwords:
            raise ValidationError(
                _("This password is too easy, please use a strong password (with numeric, uppercase and 8 characters)."),
                code='password_too_common',
            )
