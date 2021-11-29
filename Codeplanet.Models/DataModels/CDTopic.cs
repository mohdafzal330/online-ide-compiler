namespace Codeplanet.Models.DataModels
{
    public class CDTopic
    {
        public long Id { get; set; }
        public long FkModuleId { get; set; }
        public string Name { get; set; }
        public int RowStatus { get; set; } = 0;
    }

}
