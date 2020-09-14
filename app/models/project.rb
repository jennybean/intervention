class Project < ApplicationRecord
  validates :name, presence: true

  def team_lead?(user_id)
    team_lead_user_ids.include?(user_id)
  end

  def team_member?(user_id)
    team_member_user_ids.include?(user_id)
  end
end
