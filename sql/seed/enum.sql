INSERT INTO EnumUserType ([Name], [Description])
VALUES
    ('Person'),
    ('Organization'),
    ('Group');

INSERT INTO EnumEventParticipantStatus ([Name], [Description])
VALUES
    ('Pending'),
    ('Accepted'),
    ('Declined'),
    ('Tentative'),
    ('Canceled');

INSERT INTO EnumEventType ([Name], [Description])
VALUES
    ('Scrimmage'),
    ('Tournament');

INSERT INTO EnumChannelType ([Name], [Description])
VALUES
    ('Public'),
    ('Private');

INSERT INTO EnumPostType ([Name], [Description])
VALUES
    ('Text'),
    ('Image'),
    ('Video');