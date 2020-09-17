# Preview all emails at http://localhost:3000/rails/mailers/team_lead_mailer
class TeamLeadMailerPreview < ActionMailer::Preview
  TeamLeadMailer.with(
    team_leads: User.where(id: [1,2]),
    question_text: "Do you feel unproductive this week?",
    yes_votes_count: 4,
    no_votes_count: 2,
    url: 'localhost:3000'
  ).intervention_email
end
