# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

50.times { Song.create({title: Faker::Book.title}) }

100.times { Section.create({ song_id: 1+rand(50), section_type: ["verse", "chorus"].sample}) }

200.times { Snippet.create({section_id: 1+rand(100), content: Faker::Lorem.sentence(2, true, 6)}) }
