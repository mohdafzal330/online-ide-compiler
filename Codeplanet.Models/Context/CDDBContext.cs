using Codeplanet.Models.DataModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Codeplanet.Models.Context
{
    public partial class CDDBContext : DbContext
    {
        public CDDBContext(DbContextOptions options) : base(options) { }

        public DbSet<CDModule> CDModules { get; set; }
        public DbSet<CDTopic> CDTopics { get; set; }
        public DbSet<CDProblems> CDProblems { get; set; }
        public DbSet<CDTestCases> CDTestCases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Module
            modelBuilder.Entity<CDModule>().HasKey(p => p.Id);
            modelBuilder.Entity<CDModule>().Property(p => p.Name).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<CDModule>().Property(p => p.RowStatus).IsRequired().HasDefaultValue(1);
            
            // Topic
            modelBuilder.Entity<CDTopic>().HasKey(p => p.Id);
            modelBuilder.Entity<CDTopic>().Property(p => p.Name).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<CDTopic>().Property(p => p.RowStatus).IsRequired().HasDefaultValue(1);
            
            // Problems
            modelBuilder.Entity<CDProblems>().HasKey(p => p.Id);
            modelBuilder.Entity<CDProblems>().Property(p => p.Title).HasMaxLength(1000).IsRequired();
            modelBuilder.Entity<CDProblems>().Property(p => p.FkModuleId).IsRequired();
            modelBuilder.Entity<CDProblems>().Property(p => p.FkTopicId).IsRequired();
            modelBuilder.Entity<CDProblems>().Property(p => p.Content).IsRequired();
            modelBuilder.Entity<CDProblems>().Property(p => p.FkSampleTestCaseId).IsRequired();
            modelBuilder.Entity<CDProblems>().Property(p => p.RowStatus).IsRequired().HasDefaultValue(1);
            
            // TestCases
            modelBuilder.Entity<CDTestCases>().HasKey(p => p.Id);
            modelBuilder.Entity<CDTestCases>().Property(p => p.Input).IsRequired();
            modelBuilder.Entity<CDTestCases>().Property(p => p.Output);
            modelBuilder.Entity<CDTestCases>().Property(p => p.RowStatus).IsRequired().HasDefaultValue(1);
        }
    }
}
