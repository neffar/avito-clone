5.times do
    Article.create({
        title: Faker::Book.title,
        avatar: Faker::LoremFlickr.image,
        price: Faker::Code.npi,
        description: Faker::Lorem.paragraph(2)
    })

end