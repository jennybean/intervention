class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.text :name, null: false
      t.integer :team_lead_user_ids, null: false, default: [], array: true
      t.integer :team_member_user_ids, array: true
    end

    create_table :project_questions do |t|
      t.integer :project_id, null: false
      t.text :question_text
      t.integer :yes_votes, null: false, default: [], array: true # should store user_ids for members who voted yes
      t.integer :no_votes, null: false, default: [], array: true # should store user_ids for members who voted no
    end
  end
end
