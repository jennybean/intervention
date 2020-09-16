class ProjectQuestion < ApplicationRecord
  validates :project_id, presence: true
  belongs_to :projects, optional: true
end
