-- CREATE DATABASE Hangtime
-- GO

-- Drop tables if they exist
IF OBJECT_ID('ChatReaction') IS NOT NULL DROP TABLE ChatReaction;
IF OBJECT_ID('ChatPost') IS NOT NULL DROP TABLE ChatPost;
IF OBJECT_ID('ChatChannelMember') IS NOT NULL DROP TABLE ChatChannelMember;
IF OBJECT_ID('EventParticipant') IS NOT NULL DROP TABLE EventParticipant;
IF OBJECT_ID('Event') IS NOT NULL DROP TABLE Event;
IF OBJECT_ID('UserLocation') IS NOT NULL DROP TABLE UserLocation;
IF OBJECT_ID('UserProfile') IS NOT NULL DROP TABLE UserProfile;
IF OBJECT_ID('ChatChannel') IS NOT NULL DROP TABLE ChatChannel;
IF OBJECT_ID('User') IS NOT NULL DROP TABLE [User];
IF OBJECT_ID('EnumReactionType') IS NOT NULL DROP TABLE EnumReactionType;
IF OBJECT_ID('EnumPostType') IS NOT NULL DROP TABLE EnumPostType;
IF OBJECT_ID('EnumChannelType') IS NOT NULL DROP TABLE EnumChannelType;
IF OBJECT_ID('EnumEventType') IS NOT NULL DROP TABLE EnumEventType;
IF OBJECT_ID('EnumEventParticipantStatus') IS NOT NULL DROP TABLE EnumEventParticipantStatus;
IF OBJECT_ID('EnumUserType') IS NOT NULL DROP TABLE EnumUserType;

-- Enum tables
CREATE TABLE EnumUserType
(
    UserTypeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
CREATE TABLE EnumEventParticipantStatus
(
    EventParticipantStatusID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
CREATE TABLE EnumEventType
(
    EventTypeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
CREATE TABLE EnumChannelType
(
    ChannelTypeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
CREATE TABLE EnumPostType
(
    PostTypeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
CREATE TABLE EnumReactionType
(
    ReactionTypeID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL
);

-- User-related tables
CREATE TABLE [User]
(
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserTypeID INT NOT NULL REFERENCES EnumUserType(UserTypeID),
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    LastLogin DATETIME NOT NULL
);
CREATE TABLE UserProfile
(
    UserProfileID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL REFERENCES [User](UserID),
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Bio TEXT NOT NULL,
    LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE UserLocation
(
    UserLocationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL REFERENCES [User](UserID),
    Latitude DECIMAL(10, 8) NOT NULL,
    Longitude DECIMAL(11, 8) NOT NULL,
    LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Radius INT NULL
);

CREATE TABLE ChatChannel
(
    ChatChannelID INT IDENTITY(1,1) PRIMARY KEY,
    ChannelTypeID INT NOT NULL REFERENCES EnumChannelType(ChannelTypeID),
    ChatChannelName VARCHAR(255) NOT NULL
);
CREATE TABLE ChatChannelMember
(
    ChatChannelMemberID INT IDENTITY(1,1) PRIMARY KEY,
    ChatChannelID INT NOT NULL REFERENCES ChatChannel(ChatChannelID),
    UserID INT NOT NULL REFERENCES [User](UserID),
    RoleMask INT NOT NULL DEFAULT 0
);

CREATE TABLE ChatPost
(
    ChatPostID INT IDENTITY(1,1) PRIMARY KEY,
    ChatChannelID INT NOT NULL REFERENCES ChatChannel(ChatChannelID),
    PostTypeID INT NOT NULL REFERENCES EnumPostType(PostTypeID),
    AuthorID INT NOT NULL REFERENCES [User](UserID),
    ReplyToID INT NULL REFERENCES ChatPost(ChatPostID),
    Content TEXT NOT NULL,
    PostTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE ChatReaction
(
    ChatReactionID INT IDENTITY(1,1) PRIMARY KEY,
    ChatPostID INT NOT NULL REFERENCES ChatPost(ChatPostID),
    AuthorID INT NOT NULL REFERENCES [User](UserID),
    ReactionTypeID INT NOT NULL REFERENCES EnumReactionType(ReactionTypeID)
);

-- Event-related tables
CREATE TABLE [Event]
(
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    EventTypeID INT NOT NULL REFERENCES EnumEventType(EventTypeID),
    HostID INT NOT NULL REFERENCES [User](UserID),
    ChatChannelID INT NOT NULL REFERENCES ChatChannel(ChatChannelID),
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Latitude DECIMAL(10, 8) NOT NULL,
    Longitude DECIMAL(11, 8) NOT NULL,
    Radius INT NOT NULL,
    MinParticipants INT NULL,
    MaxParticipants INT NULL,
    LastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE EventParticipant
(
    UserEventID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT NOT NULL REFERENCES [Event](EventID),
    UserID INT NOT NULL REFERENCES [User](UserID),
    EventParticipantStatusID INT NOT NULL REFERENCES EnumEventParticipantStatus(EventParticipantStatusID)
);