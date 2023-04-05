puts "🌱 Seeding users..."
User.create!(username: "Seeder", password: "seedpass", image_url: "/duck.jpeg" )

User.create!(username: "Seederbyday", password: "seederbynight", image_url: '/imposter.jpeg')

User.create!(username: "IbeSeeding", password: "seedinfolife", image_url: "/butterfly.jpeg")
Post.create!(user_id: 1, bark: "hello")
Post.create!(user_id: 2, bark: "hey hey")
Post.create!(user_id: 3, bark: "I was seeded")
puts "✅ Done seeding!"

