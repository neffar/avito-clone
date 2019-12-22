class Article < ApplicationRecord
    validates :title, presence: true
    validates :price, presence: true
    validates :description, presence: false
    
    mount_uploader :avatar, AvatarUploader

end
