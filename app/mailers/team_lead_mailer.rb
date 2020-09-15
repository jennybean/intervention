class TeamLeadMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def intervention_email
    @team_leads = User.where(id: params[:team_lead_user_ids])
    @question_text = params[:question_text]
    @yes_votes_count = params[:yes_votes_count]
    @no_votes_count = params[:no_votes_count]
    @total_votes = @yes_votes_count + @no_votes_count
    @url = params[:url]
    @team_leads.find_each |team_lead| do
      mail(to: team_lead.email, subject: 'Intervention Needed')
    end
  end
end
